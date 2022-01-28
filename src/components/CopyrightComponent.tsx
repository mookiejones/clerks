import {
  Typography,
  Link
} from '@mui/material'


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