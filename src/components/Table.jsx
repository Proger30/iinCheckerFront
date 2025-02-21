import {Table, Box, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Fade} from '@mui/material';
import { HowToReg, ContactEmergency, PhoneEnabled } from '@mui/icons-material'

export default function ViewTable({data}) {
  const dataLen = data.length !== 0
	return (
	<Fade
		in={dataLen}
		style={{
			transitionDelay: dataLen ? '300ms' : '0ms',
		}}
		unmountOnExit
		>
    <TableContainer component={Paper} sx={{width: "90%"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Box sx={{...TagWithIcon, justifyContent: "start"}}><Typography>IIN</Typography><ContactEmergency color="success" /></Box></TableCell>
            <TableCell align="right"><Box sx={TagWithIcon}><Typography>Name</Typography><HowToReg color="warning"/></Box></TableCell>
            <TableCell align="right"><Box sx={TagWithIcon}><Typography>Phone</Typography><PhoneEnabled color="info"/></Box></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.iin}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.iin}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	</Fade>
  );
}

const TagWithIcon = {display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center", gap:1}