import { DscContractAbi } from '@/lib/DscContractAbi'
import { TEST_ENGINE_ADDRESS } from '@/lib/constants'
import { Abi } from 'viem'
import { useContractReads } from 'wagmi'


type CustomResult = [bigint, bigint];





const TestReadDSCEngine = () => {

    const { data, isError, isSuccess, isLoading } = useContractReads({
        contracts: [
          {
            address: TEST_ENGINE_ADDRESS,
            abi: DscContractAbi as Abi,
            functionName: 'getAccountInformation',
            args: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
          }
        ],
      })

    console.log('data', data)

    const renderResult = (returnData : typeof data) => {
        return returnData?.map((item, index) => {
            if (item.status === "success") {
                // Destructure the two bigint values
                const result = item.result as CustomResult;
                const [firstValue, secondValue] = result;
                return (
                    <div key={index}>
                        <p>Total DSC Minted: {firstValue.toString()}</p>
                        <p>Value In USD: {secondValue.toString()}</p>
                    </div>
                );
            } else {
                return <div key={index}>Error: {item.error?.message}</div>;
            }
        }
        );
    }

    return (
        <div className="">
            <div className='font-bold'>
                Get Account Information
            </div>
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>{renderResult(data)} </div>}
            {isError && <div>Read Transaction: {data?.map( e => e.error?.message)} </div>}
        </div>
    )
}



export default TestReadDSCEngine