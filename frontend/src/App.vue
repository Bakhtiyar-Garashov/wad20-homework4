<template>
    <div id="app">
        <RouterView/>
    </div>
</template>

<script>

    export default {
        name: 'App'
    }
</script>

<style>
    * {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        outline: none;
    }

    html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: auto;
    }

    body {
        background-color: #0277bd;
        color: #263238;
    }

    a {
        color: #6abdd3;
    }

    button {
        padding: 8px 16px;
        margin: 4px 0;
        color: #ffffff;
        background-color: #01579b;
        border: none;
        border-radius: 4px;
    }

    button:hover {
        box-shadow: 0 0 5px rgba(38, 50, 56, 0.7);
        cursor: pointer;
    }

    .error {
        color: #ff565c;
        font-weight: bold;
        padding: 5px;
    }

    .success {
        color: #61c42b;
        font-weight: bold;
        padding: 5px;
    }

    #app {
        margin-top: 60px;
    }
    .main-container {
        width: 50%;
        min-height: 100%;
        margin: auto auto;
        padding: 90px 15px 15px 15px;
        background-color: #ffffff;
    }

    .form-page {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #form-container {
        min-width: 25%;
        width: 25%;
        background-image: url(assets/logo.png);
        background-size: 20% auto;
        background-repeat: no-repeat;
        background-position: 15px 15px;
        padding: 45px 45px;
        background-color: #ffffff;
        box-shadow: 0 0 15px rgba(38, 50, 56, 0.33);
        text-align: center;
    }

    #form-container .form input {
        padding: 8px 16px;
        margin: 4px 0;
        text-align: left;
        width: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>
