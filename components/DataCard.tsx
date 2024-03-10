import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DataCardProps = {
  title: string;
  displayData: string | null;
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
  subText: string;
};


const DataCard = ({ title, displayData, isLoading, isError, error, subText } : DataCardProps ) => {

  const renderResult = () => {
    if (isLoading) {
      return <Skeleton className="h-[50%] w-[90%] mx-3" />;
    }
    if (isError) {
      return <div>Error: {error}</div>;
    }
    if (displayData) {
      return (
        <CardContent>
          <div className="text-2xl font-bold">
            {displayData}
          </div>
          <p className="text-xs text-muted-foreground">
            {subText}
          </p>
        </CardContent>
      );
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      {renderResult()}
    </Card>
  );
};

export default DataCard;

