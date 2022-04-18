import React from 'react';
import Box from '@mui/material/Box';


interface IErrorProps {
    message: string;
    children? : any;
}

interface IErrorState {
    hasError: boolean;
    errorDescription: string;
}

export default class ErrorBoundary extends React.Component<IErrorProps, IErrorState> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, errorDescription: '' };
    }

    componentDidCatch(error: any) {
        this.setState({ hasError: true, errorDescription: error });
    }

    render() {
        if (this.state.hasError) {
            console.log(`Could Not Render - ${this.props.message}`, this.state.errorDescription);
            // return process.env.NODE_ENV === 'development' ? (
                return (<Box >
                    {`Could Not Render - ${this.props.message}`}
                </Box>)
            // ) : (<div />);
        }
        return this.props.children || <div />;
    }
}
