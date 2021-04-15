<template>
    <svg
        width="65px"
        height="65px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
        draggable="false"
        alt="Cargando..."
        :stroke="color">
        <circle
            stroke-width="6"
            fill="none"
            stroke-linecap="round"
            cx="33" cy="33" r="30">
        </circle>
    </svg>
</template>

<script>
export default {
    name: 'spinner-circular',

    props: {
        color: {
            type: String,
            default: 'var(--a-color)'
        }
    }
}
</script>

<style scoped>
    svg {
        animation: rotator 1.3s linear infinite;
    }

    circle {
        stroke-dasharray: 187;
        stroke-dashoffset: 0;
        transform-origin: center;
        animation: dash 2s ease-in-out infinite;
    }

    @keyframes rotator {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        from {
            stroke-dashoffset: 188;
        }
        50% {
            stroke-dashoffset: 46.75;
            transform: rotate(0deg);
        }
        to {
            stroke-dashoffset: 188;
            transform: rotate(360deg);
        }
    }
</style>
