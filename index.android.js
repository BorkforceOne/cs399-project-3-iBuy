/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Navigator, BackAndroid } from 'react-native';

import GroupSettingsScene from './js/Scenes/GroupSettingsScene';
import SignInScene from './js/Scenes/SignInScene';
import AboutScene from './js/Scenes/AboutScene';
import RegisterScene from './js/Scenes/RegisterScene';
import ItemViewScene from './js/Scenes/ItemViewScene.js';

export default class iBuy extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Allow back button to return to last scene
        BackAndroid.addEventListener('hardwareBackPress', () => {
            const routes = this._navigator.getCurrentRoutes();

            if (routes.length == 1) {
                // Close the app
                return false;
            }
            this._navigator.pop();
            return true;
        });
    }

    /**
     * Render the app
     */
    render() {
        // Simply divert the rendering to renderScene()
        return (
            <Navigator
                ref={(ref) => {
                    this._navigator = ref;
                }}
                configureScene={() => {
                    return Navigator.SceneConfigs.FadeAndroid;
                }}
                initialRoute={{id: 'sign-in'}}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }

    /**
     * Decide which root level component to render depending on which scene is currently being accessed
     * @param route - The route to render
     * @param navigator - The navigator
     */
    renderScene(route, navigator) {

        let params = {
            route: route,
            navigator: navigator
        };

        switch (route.id) {
            // Render the calculator
            case "sign-in":
                return (
                    <SignInScene {...params}/>
                );
            case "about":
                return (
                    <AboutScene {...params}/>
                );
            case "register":
                return (
                    <RegisterScene {...params}/>
                );
            case "main":
                return (
                    <ItemViewScene {...params}/>
                );
            case "group-settings":
                return (
                    <GroupSettingsScene {...params}/>
                );
        }
    }
}

AppRegistry.registerComponent('iBuy', () => iBuy);