import * as React from 'react'

import { Alert, Box, TextField, Button, Fade, CircularProgress} from '@mui/material';

import axios from 'axios';

export default function AddData() {

	const [payload, setPayload] = React.useState({iin: "", name: "", phone: ""})
	const [response, setResponse] = React.useState(null)

	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState("")

	const onAddData = () => {
		setResponse(null)
		setLoading(true)
		setError("")
		axios.post("http://217.114.7.145:8080/people/info", payload)
		.then(resp => {
			setResponse({status: resp.status, data: resp.data.data})
		})
		.catch(err => {
			err.response?.status && setResponse({status: err.response.status, data: err.response.data.message})
			setError(err.message)
		})
		.finally(() => {
			setLoading(false)
		})
	}

	return (
<Fade in={true} style={{transitionDelay: '200ms'}} unmountOnExit>
		<Box
		sx={{
			p: 10,
			display: 'flex',
			flexDirection: 'row',
			justifyContent: "space-around",
			alignItems: 'start',
			textAlign: 'center',
			gap: 1,
			width: "100%"
		}}
		>
			<Box
				component="form"
				onSubmit={(e) => {e.preventDefault(); onAddData()}}
				sx={{ display: "flex", flexDirection: "column", gap: 2, marginRight: "auto" }}
				noValidate
				autoComplete="off"
				width="40%"
			>
				<TextField id="outlined-basic" label="Name" variant="outlined" value={payload.name} onChange={(e) => {setPayload(payload => ({...payload, name: e.target.value}))}} />
				<TextField id="outlined-basic" label="IIN" variant="outlined"  value={payload.iin} onChange={(e) => {setPayload(payload => ({...payload, iin: e.target.value}))}} />
				<TextField id="outlined-basic" label="Phone" variant="outlined"  value={payload.phone} onChange={(e) => {setPayload(payload => ({...payload, phone: e.target.value.replace(/[^0-9]/g, '')}))}} />
				<Button variant='contained' onClick={onAddData} disabled={loading}>Add New Data</Button>
			</Box>
			<Box sx={{width: "40%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
						{<Fade
						in={response || error}
						style={{
							transitionDelay: response || error ? '200ms' : '0ms',
						}}
						unmountOnExit
						>
							<Alert severity={error ? "error": "success"} variant='outlined' sx={{width: "100%"}}>{ response?.status == 200 ? "Data added successfully!" : response ? response.data : error ? error : "Some error happend :(" }</Alert>
						</Fade>}
						{loading && <Box sx={{ height: 40 }}>
							<Fade
							in={loading}
							style={{
								transitionDelay: loading ? '200ms' : '0ms',
							}}
							unmountOnExit
							>
							<CircularProgress />
							</Fade>
						</Box>}
						
					</Box>
		</Box>
		</Fade>
	);
}