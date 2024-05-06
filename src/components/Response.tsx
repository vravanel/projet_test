import { RadioGroup, Radio, cn } from "@nextui-org/react";
import { AriaRadioProps } from "@react-types/radio";

interface props {
  props: AriaRadioProps;
}

interface CustomRadioProps extends AriaRadioProps {
  description: string;
  value: string;
}

export const CustomRadio: React.FC<props> = ({ props }) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export default function Response() {
  return (
    <RadioGroup
      label="Plans"
      description="Selected plan can be changed at any time."
    >
      <CustomRadio description="Up to 20 items" value="free">
        Free
      </CustomRadio>
      <CustomRadio description="Unlimited items. $10 per month." value="pro">
        Pro
      </CustomRadio>
      <CustomRadio
        description="24/7 support. Contact us for pricing."
        value="enterprise"
      >
        Enterprise
      </CustomRadio>
    </RadioGroup>
  );
}
