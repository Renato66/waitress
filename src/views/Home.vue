<template>
  <div class="c-home">
    <div class="c-navbar">
      <div class="c-navbar__avatar">
        <transition name="slide-fade-reverse" v-if="$auth.user.picture">
          <CAvatar :src="$auth.user.picture" size="64" alt="User avatar" />
        </transition>
      </div>
      <div class="c-navbar__name pl-4">
        <h2 class="title my-0">
          {{ $auth.user.name }}
        </h2>
        <p class="c-link my-0 c-navbar__logoff" @click="logout()">
          sair
        </p>
      </div>
      <div class="c-navbar__tips">
        <CTips v-if="waiter" :goal="waiter.goal" :tips="waiter.totalTips" />
      </div>
    </div>
    <CTabs v-model="tab" :items="tabs" dataValue="route" class="mb-8"/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CAvatar from '@/components/core/Avatar'
import CTips from '@/components/Tips'
import CTabs from '@/components/core/Tabs'
export default {
  components: {
    CAvatar,
    CTips,
    CTabs
  },
  data () {
    return {
      tabs: [
        {
          text: 'Mesas',
          route: 'tables-list'
        },
        {
          text: 'Pedidos',
          route: 'orders-list'
        },
        {
          text: 'Menu',
          route: 'menu'
        }
      ]
    }
  },
  methods: {
    ...mapActions('auth', ['logOut']),
    logout () {
      this.$auth.logout({
        returnTo: window.location.origin + '/logout'
      })
    }
  },
  computed: {
    tab: {
      get () {
        return this.$route.name
      },
      set (value) {
        this.$router.push({ name: value })
      }
    },
    ...mapGetters('auth', ['user']),
    ...mapGetters('waiter', ['waiter'])
  }
}
</script>

<style lang="stylus">
// .c-home
.c-navbar
  display flex
  max-width 1184px
  margin auto
  align-items center
  &__avatar
    flex-shrink 1
  &__name
    flex 1
  &__logoff
    width fit-content
  &__tips
    flex-shrink 1
    text-align right
</style>
