import React from 'react';
import {useFormikContext} from 'formik';

import {ButtonLogin} from '~/components/Button';

function SubmitButton({title, ...props}) {
  const {handleSubmit} = useFormikContext();

  return <ButtonLogin title={title} onPress={handleSubmit} {...props} />;
}

export default SubmitButton;
