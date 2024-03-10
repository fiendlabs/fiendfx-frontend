type HeadingTwoProps = {
  text: string;
  subText?: string;
};

export const HeadingTwo = ({ text }: { text: string }) => (
  <div>
    <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
      {text}
    </h2>
  </div>
);
