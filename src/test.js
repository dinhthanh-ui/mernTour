import React from 'react';
import
{
	MDBInputGroup,
} from 'mdb-react-ui-kit';

export default function App ()
{
	return (
		<>
			<MDBInputGroup className='mb-3' size='sm' textBefore='Small'>
				<input className='form-control' type='text' />
			</MDBInputGroup>

			<MDBInputGroup className='mb-3' textBefore='Default'>
				<input className='form-control' type='text' />
			</MDBInputGroup>

			<MDBInputGroup className='mb-3' size='lg' textBefore='Large'>
				<input className='form-control' type='text' />
			</MDBInputGroup>
		</>
	);
}