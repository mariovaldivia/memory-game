<template>
    <section class="card container my-2 shadow-sm">

        <div class="row" v-if="loaded">
            <div class="col col-md-6 py-2 px-4">
                {{ userName }}
                <button class="btn btn-secondary btn-sm" @click="changeUser">
                    Change
                </button>
            </div>

            <div class="col-6">
                <div class="row">
                    <div class="col-xs-12 col-md-6 justify-content-center">
                        <div class="hstack">
                            <div class="p-2">Hits</div>
                            <div class="p-2">
                                <span class=" text-bg-success py-1 px-3">
                                    {{ asserted }}
                                </span>
                            </div>
                        </div>      
                    </div>

                    <div class=" col-xs-12 col-md-6 justify-content-center">
                        <div class="hstack">
                            <div class="p-2">Fails</div>
                            <div class="p-2">
                                <span class=" text-bg-danger py-1 px-3 ">
                                    {{ failed }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div class="placeholder-wave" v-else>
            <span class="placeholder col-5 m-1"></span>
            <span class="placeholder col-3 m-1"></span>
            <span class="placeholder col-3"></span>
        </div>
    </section>
</template>

<script lang="ts">
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia'

export default {
    props: {
        asserted: Number,
        failed: Number,
        loaded: Boolean
    },
    setup(props) {
        const userStore = useUserStore()
        const { userName } = storeToRefs(userStore)

        function changeUser() {
            userStore.setName('')
        }
        return {
            userName,
            changeUser
        }
    }
}
</script>

<style>

</style>