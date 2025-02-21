import { Navigate } from 'react-router';

export default function Navigation({pathToNavigate}) {
	return (
    	<Navigate to={pathToNavigate == "/" ? "/check-iin" : pathToNavigate} />
  );
}