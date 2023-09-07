import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const userName = ref(JSON.parse(localStorage.getItem('name')))

    function setName(name: string){
        userName.value = name
        localStorage.setItem('name', JSON.stringify(name))
    }
    return {
        userName,
        setName
    }
});