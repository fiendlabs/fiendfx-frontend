
type EmptyResultProps = {
    text?: string;
    subText?: string;
}

const EmptyResult = ({text , subText} : EmptyResultProps) => {
    return (
        <div className=" h-full bg-muted rounded-md flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">{text}</div>
          <p className="text-xs text-muted-foreground">
            {subText}
          </p>
        </div>
      </div>
    )   

}

export default EmptyResult;