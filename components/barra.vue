<template>
    <div class="barra">
        <div :style="{backgroundColor}"></div>
    </div>
</template>

<script>
export default {
    name: 'barra',

    props: {
        backgroundColor: {
            type: String,
            default: 'var(--a-color)'
        }
    }
}
</script>

<style scoped>
    .barra {
        height: 6px;
        background-color: transparent;
        width: 100%;
        margin: .5em 0;
    }

    .barra div {
        height: 100%;
        animation: mover 3s cubic-bezier(0.42, 0, 1, 1) infinite;
    }

    @keyframes mover {
        from {
            margin-left: 0;
            width: 0;
        }

        50% {
            margin-left: 20%;
            width: 80%;
        }

        to {
            margin-left: 100%;
            width: 0;
        }
    }
</style>
