import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient,QueryClientProvider} from "react-query";
/*
    refetchOnWindowFocus:false => window(브라우저)가 포커스를 얻은 경우
    refetchOnMount:false => 쿼리 => 새 인스턴스가 마운트 될 경우
                                   화면이 변경이 된 경우
                                   => 새로운 데이터를 읽어 온다
    refetchOnReconnect:false => 네트워크가 끊긴 경우
    retry:false => 재시도
    staleTime:5*60*1000  => 데이터 저장 시간
*/
const qyertClient=new QueryClient({
    defaultOptions:{
        queries:{
            refetchOnWindowFocus:false,
            refetchOnMount:false,
            refetchOnReconnect:false,
            retry:false,
            staleTime:5*60*1000
        }
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={qyertClient}>
        <App />
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
