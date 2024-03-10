type HeadingOneProps = {
  text: string;
  subText?: string;
};

const HeadingOne = ({ text, subText }: HeadingOneProps) => (
  <div>
    <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{text}</h1>
    {subText && <p className="text-lg text-muted-foreground">{subText}</p>}
  </div>
);

export default HeadingOne;
