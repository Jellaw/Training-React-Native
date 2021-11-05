import React from 'react';
import {useFormikContext} from 'formik';

import Picker from '../Picker';
import ErrorMessage from './ErrorMessage';

function AppFormPicker({
  data,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
  onChange,
}) {
  const {errors, setFieldValue, touched, values} = useFormikContext();
  const handleOnChange = item => {
    setFieldValue(name, item.id);
    onChange && onChange(item);
  };

  return (
    <>
      <Picker
        data={data}
        numberOfColumns={numberOfColumns}
        onSelectItem={item => handleOnChange(item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
