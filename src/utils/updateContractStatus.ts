import axiosInstance from "./axiosInstance";

export  const updateContractStatus = async (contractId: string, status: string, token: string) => {
    try {
        await axiosInstance.patch(`contracts/${contractId}`, {
            status
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(`Contract status updated to ${status}`);
    } catch (error) {
        console.error('Error updating contract status:', error);
        // @ts-ignore
        alert(`Error updating contract status: ${error.message}`);
    }
};


