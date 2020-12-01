import React from "react";
import PropTypes from 'prop-types';
import './sign-in.scss';
import "antd/dist/antd.css";
import { Form, Input, Button, Alert, message } from 'antd';
import {Link, Redirect} from "react-router-dom";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
    }
};

const SignIn = ({ asyncAuthentication, serverValidations, user, error }) => {
    const [form] = Form.useForm();

    const onFinish = ({email, password}) => {
        asyncAuthentication(email, password);
    };

    if (Object.keys(user).length) {
        return <Redirect to='/' />;
    }

    if(error){
        message.error('Cannot connect to server');
    }

    return (
        <Form
            {...formItemLayout}
            className="form"
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            {serverValidations && <Alert message={serverValidations} type="warning" showIcon style={{marginBottom:30}} />}
            <h2>Sign in</h2>
            <Form.Item
                name="email"
                label="E-mail"
                className="form__item"
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!"
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!"
                    }
                ]}
            >
                <Input placeholder="E-mail" className="form__input" />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                className="form__item"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!"
                    }
                ]}
                hasFeedback
            >
                <Input.Password placeholder="Password" className="form__input" />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" block  htmlType="submit">
                    Login
                </Button>
                <p className="have-an-account">Don’t have an account? <Link to="/sign-up">Sign Up.</Link></p>
            </Form.Item>
        </Form>
    );
};

SignIn.propTypes = {
    asyncAuthentication: PropTypes.func.isRequired,
    serverValidations: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,

    user: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        username: PropTypes.string,
        bio: PropTypes.string,
        image: PropTypes.string,
        token: PropTypes.string,
    }).isRequired,
}

export default SignIn;
