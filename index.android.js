/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';
import SignInScene from './js/Scenes/SignInScene.js';
import AboutScene from './js/Scenes/AboutScene';
import MainScene from './js/Scenes/MainScene.js';

export default class iBuy extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render the app
     */
    render() {
        // Simply divert the rendering to renderScene()
        return (
            <Navigator
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
                )
            case "main":
                return (
                    <MainScene {...params}/>
                );
        }
    }
}

AppRegistry.registerComponent('iBuy', () => iBuy);