import axios from "axios"
import { Session } from "next-auth"
import { SessionContextValue, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { SERVER_LOCALHOST } from './properties';


export const axiosPublic = axios.create({

    baseURL: `${SERVER_LOCALHOST}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    }
}

)

export const axiosPrivate = axios.create({

    baseURL: `${SERVER_LOCALHOST}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    }
}

)