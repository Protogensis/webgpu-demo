<template>
    <div class="side">
        <h4>WebGPU-Demo</h4>
        <hr>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/About">About</RouterLink>
        <RouterLink to="/HelloTriangle">Hello Triangle</RouterLink>
    </div>
</template>

<style scoped>
    .side{
        width: 200px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: start;
        padding: 10px;
    }

    h4{
        margin: 5px 0;
    }

    hr{
        width: 100%;
        border: 0;
        height: 3px;
        background-color: gray;
    }
    a{
        margin: 5px 0;
    }
</style>