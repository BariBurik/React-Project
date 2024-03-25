import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import {SwitchTransition} from "react-transition-group";
import PostIdPage from "../pages/PostIdPage";
import {privateRoutes, publicRoutes} from "../router/routes";
import {useFetching} from "../hooks/useFetching";
import {AuthContext} from "../context";
import MyLoader from "./UI/loader/MyLoader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <MyLoader></MyLoader>
    }

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        Component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Route path='*' element={<Navigate to={'/posts'}/>}></Route>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        Component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Route path='*' element={<Navigate to={'/login'}/>}></Route>
            </Routes>
    );
};

export default AppRouter;