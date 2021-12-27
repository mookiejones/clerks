import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
const CopyrightComponent = () => (
    <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https:/norplas.com/">
      Norplas
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)

export default CopyrightComponent;