<template>
    <div class="modal fade show d-block" tabindex="-1" aria-hidden="true">

        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.modal {
    background-color: rgba(0, 0, 0, 0.25)
}
</style>