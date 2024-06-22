import React from 'react'
import Switch from '@mui/joy/Switch';

function Switch() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}

export default Switch
