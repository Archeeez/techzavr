<template>
  <transition name="fade">
    <div class="preloader_wrapper"
        :class="[fullPage ? 'fixed' : 'absolute', centered ? 'inset-0' : '']">
      <div class="preloader_blackout" v-show="blackout"></div>
      <div class="preloader_loader"
          :class="small ? 'preloader_loader--small': 'reloader_loader--big'"
          :style="top ? `top:${top};`: ''">loading</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PreloaderAnimation',
  props: ['fullPage', 'centered', 'blackout', 'small', 'top'],
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.preloader_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.fixed {
  position: fixed;
  z-index: 5;
}

.absolute {
  position: absolute;
  z-index: 5;
}

.preloader_blackout {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px);
  /* background-color: rgba(117, 111, 134, 0.2); */
}

.preloader_loader--big {
  margin: 80px auto;
}

.preloader_loader--small {
  margin: 0 auto;
}

.preloader_loader,
.preloader_loader:before,
.preloader_loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.preloader_loader {
  color: #9FEE00;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.preloader_loader:before,
.preloader_loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.preloader_loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.preloader_loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
