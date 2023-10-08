import React from 'react'
import LayoutBorderRadius from "../layouts/LayoutBorderRadius";
import {
  CryptoListConverter,
  FormContainerConverter
} from "../components/converter";

const Converter = () => {
  return (
    <div>
      <LayoutBorderRadius>
        <FormContainerConverter />
        <CryptoListConverter className={"mt-4"} />
      </LayoutBorderRadius>
    </div>
  );
};

export default Converter;
