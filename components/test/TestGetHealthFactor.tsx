import { DscContractAbi } from '@/lib/DscContractAbi'
import { TEST_ENGINE_ADDRESS } from '@/lib/constants'
import { Abi } from 'viem'
import { useAccount, useContractReads } from 'wagmi'

const TestGetHealthFactor = () => {
    const userAddress = useAccount();
    console.log('userAddress', userAddress);

    const { data, isError, isSuccess, isLoading } = useContractReads({
        contracts: [
            {
                address: TEST_ENGINE_ADDRESS,
                abi: DscContractAbi as Abi,
                functionName: 'getHealthFactor',
                args: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
            }
        ],
    });

    console.log('Precision data', data);

    return (
        <div>
            <div className='font-bold'>
                Get Health Factor
            </div>
            {isLoading && <div>Loading...</div>}
            {isSuccess && <div>Health Factor: {data?.[0].result?.toString()}</div>}
            {isError && <div>Error: {data?.[0].error?.message}</div>}
        </div>
    );
}

export default TestGetHealthFactor;
