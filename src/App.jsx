import { BrowserRouter as Router, Routes, Route } from 'react-router';

import { createTheme } from '@mui/material/styles';
import { HowToReg, GroupAdd, ContactPage, Flaky } from '@mui/icons-material';

import { useDemoRouter } from '@toolpad/core/internal';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { CheckIIN, AddData, GetData } from './pages';

import Navigation from './components/Navigation';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const NAVIGATION = [
	{
	  segment: 'check-iin',
	  title: 'Check IIN',
	  icon: <HowToReg />,
	},
	{
	  segment: 'add-data',
	  title: 'Add Data',
	  icon: <GroupAdd />,
	},
	{
	  segment: 'get-data',
	  title: 'Get Data',
	  icon: <ContactPage />,
	},
  ];

function App() {
	const router = useDemoRouter('/')

  	return (
	  <Router >
		<AppProvider
			navigation={NAVIGATION}
			branding={{
			logo: <Flaky sx={{width: "100%", height: "100%"}} color="info" />,
			title: 'IIN Checker',
			}}
			router={router}
			theme={theme}
			window={window}
			>
			<DashboardLayout>
				<Navigation pathToNavigate={router.pathname} />
				<Routes>
					<Route path="/check-iin" element={<CheckIIN />} />
					<Route path="/add-data" element={<AddData />} />
					<Route path="/get-data" element={<GetData />} />
				</Routes>
			</DashboardLayout>
		</AppProvider>
	  </Router>
  	);
}

export default App;