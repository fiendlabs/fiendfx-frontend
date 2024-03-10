import { DscContractAbi } from '@/lib/DscContractAbi'
import { TEST_DSCE_ADDRESS } from '@/lib/constants'
import { Abi } from 'viem'
import { useContractReads } from 'wagmi'

const TestReadPrecision = () => {
    const { data, isError, isSuccess, isLoading } = useContractReads({
        contracts: [
            {
                address: TEST_DSCE_ADDRESS,
                abi: DscContractAbi as Abi,
                functionName: 'getPrecision',
                // No args needed for this function
            }
        ],
    });

    console.log('Precision data', data);

    return (
        <div>
            <div className='font-bold'>
                Get Precision
            </div>
            {isLoading && <div>Loading...</div>}
            {isSuccess && <div>Precision: {data?.[0].result?.toString()}</div>}
            {isError && <div>Error: {data?.[0].error?.message}</div>}
        </div>
    );
}

export default TestReadPrecision;
