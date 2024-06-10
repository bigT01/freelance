// src/store/userStore.ts
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axiosInstance from '../utils/axiosInstance';


interface User {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePictureURL: string;
    bio: string;
    walletAddress: string;
    role: number;
}

interface Job {
    id?: string;
    title: string;
    budget: number;
    deadline: string;
    postDate: string;
    jobStatus: string;
    startDate: string;
    client?: {
        id: string;
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

interface JobApplication {
    id: string;
    proposal: string;
    status: string;
    job: Job;
    user: User;
}

interface UserState {
    user: User | null;
    token: string | null;
    jobs: Job[];
    applications: JobApplication[];
    postJob: (job: Job) => void;
    fetchMyJobs: () => void;
    editJob: (job: Job) => void;
    deleteJob: (jobId: string) => void;
    fetchAllJobs: () => void;
    fetchApplicants: (jobId: string) => void;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: number;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    registerUser: () => void;
    fetchUser: (userId: string) => void;
    loginWithEmail: (email: string, password: string) => void;
    setUserName: (userName: string) => void;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setRole: (role: number) => void;
    acceptApplication: (jobId: string, applicationId: string) => void;
    declineApplication: (jobId: string, applicationId: string) => void;
}

export const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                token: null,
                jobs: [],
                applications: [],
                userName: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                role: 1,
                setUser: (user) => set(() => ({ user })),
                setToken: (token) => set(() => ({ token })),
                setUserName: (userName) => set(() => ({ userName })),
                setFirstName: (firstName) => set(() => ({ firstName })),
                setLastName: (lastName) => set(() => ({ lastName })),
                setEmail: (email) => set(() => ({ email })),
                setPassword: (password) => set(() => ({ password })),
                setRole: (role) => set(() => ({ role })),
                postJob: async (job: Job) => {
                    const { token } = useUserStore.getState();
                    if (token) {
                        try {
                            await axiosInstance.post('jobs', job, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                                .then((res) => {
                                    console.log('Job posted successfully:', res.data);
                                })
                        } catch (error) {
                            console.error('Error posting job:', error);
                        }
                    } else {
                        console.error('No token found');
                    }
                },
                fetchUser: async (userId: string) => {
                    try {
                        await axiosInstance.get(`users/${userId}`)
                            .then(res => {
                                set({ user: res.data });
                            })

                    } catch (error) {
                        console.error('Error fetching user:', error);
                    }
                },
                fetchMyJobs: async () => {
                    const { token } = useUserStore.getState();
                    if (token) {
                        try {
                            await axiosInstance.get('jobs/my-jobs', {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                                .then((res) => {
                                    set({ jobs: res.data });
                                })
                        } catch (error) {
                            console.error('Error fetching jobs:', error);
                        }
                    } else {
                        console.error('No token found');
                    }
                },
                editJob: async (job: Job) => {
                    const { token } = useUserStore.getState();
                    if (token) {
                        try {
                            const response = await axiosInstance.patch(`jobs/${job.id}`, job, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            set((state) => ({
                                jobs: state.jobs.map((j) => (j.id === job.id ? response.data : j)),
                            }));
                            console.log('Job edited successfully:', response.data);
                        } catch (error) {
                            console.error('Error editing job:', error);
                        }
                    } else {
                        console.error('No token found');
                    }
                },
                deleteJob: async (jobId: string) => {
                    const { token } = useUserStore.getState();
                    if (token) {
                        try {
                            await axiosInstance.delete(`jobs/${jobId}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            set((state) => ({
                                jobs: state.jobs.filter((job) => job.id !== jobId),
                            }));
                            console.log('Job deleted successfully');
                        } catch (error) {
                            console.error('Error deleting job:', error);
                        }
                    } else {
                        console.error('No token found');
                    }
                },
                fetchAllJobs: async () => {
                    try {
                        await axiosInstance.get('jobs')
                            .then(res => {
                                set({ jobs: res.data.data });
                            })
                    } catch (error) {
                        console.error('Error fetching all jobs:', error);
                    }
                },
                fetchApplicants: async (jobId: string) => {
                    const { token } = useUserStore.getState();
                    if (token) {
                        try {
                            await axiosInstance.get(`job-applications/job/${jobId}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                                .then(res => {
                                    set({ applications: res.data });
                                })

                        } catch (error) {
                            console.error('Error fetching applicants:', error);
                        }
                    } else {
                        console.error('No token found');
                    }
                },
                acceptApplication: async (jobId: string, applicationId: string) => {
                    const { token } = useUserStore.getState();
                    if (token) {
                        try {
                            await axiosInstance.patch(`job-applications/${jobId}/accept/${applicationId}`, {}, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            set((state) => ({
                                applications: state.applications.map((application) =>
                                    application.id === applicationId ? { ...application, status: 'accepted' } : application
                                ),
                            }));
                            console.log('Application accepted successfully');
                        } catch (error) {
                            console.error('Error accepting application:', error);
                        }
                    } else {
                        console.error('No token found');
                    }
                },
                declineApplication: async (jobId: string, applicationId: string) => {
                    const { token } = useUserStore.getState();
                    if (token) {
                        try {
                            await axiosInstance.patch(`job-applications/${jobId}/decline/${applicationId}`, {}, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            set((state) => ({
                                applications: state.applications.map((application) =>
                                    application.id === applicationId ? { ...application, status: 'declined' } : application
                                ),
                            }));
                            console.log('Application declined successfully');
                        } catch (error) {
                            console.error('Error declining application:', error);
                        }
                    } else {
                        console.error('No token found');
                    }
                },
                registerUser: async () => {
                    const { userName, firstName, lastName, email, password, role } = useUserStore.getState();
                    try {
                        await axiosInstance.post('user', {
                            userName,
                            firstName,
                            lastName,
                            email,
                            password,
                            role,
                        });
                        // Automatically log in after registration
                        axiosInstance.post('auth/login', {
                            email,
                            password,
                        }).then(res => {
                            const { accessToken, user } = res.data;
                            set({ token: accessToken, user });
                        });
                    } catch (error) {
                        console.error('Registration or login error:', error);
                    }
                },
                loginWithEmail: async (email: string, password: string) => {
                    try {
                        axiosInstance.post('auth/login', {
                            email,
                            password,
                        }).then(res => {
                            set({ token: res.data.accessToken, user: res.data.user });
                        });
                    } catch (error) {
                        console.error('Login error:', error);
                    }
                },
            }),
            {
                name: 'user-store', // name of item in the storage (must be unique)
            }
        )
    )
);
