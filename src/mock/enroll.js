// src/mock/mock.js

import Mock from "mockjs";
import baseURL from "@/backendAPI.js";

Mock.mock(baseURL + '/api/v1/auth/public/register',
    'post', {
        "statusCode": 200,
        "message": "成功",
    }
)