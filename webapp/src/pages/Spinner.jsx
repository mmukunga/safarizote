import React from 'react';
import { Spinner } from '@skatteetaten/frontend-components';

const Spinner = () => (
<div className="Spinner"  style={{ textAlign: 'center' }}>
    <Spinner size={Spinner.Size.large} spinnerColor="black" />
</div>
);

export default Spinner;