import { Box, Link, Typography } from '@mui/material'

const Footer = () => (
  <Box display="flex" width={1} position="fixed" bottom={0} p={2} justifyContent="center">
    <Typography variant="caption">
      Made by{' '}
      <Link href="https://thebinaryfelix.me/" rel="noopener noreferrer" target="blank">
        thebinaryfelix
      </Link>
    </Typography>
  </Box>
)

export default Footer
