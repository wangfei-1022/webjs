<template>
	<div class="edit-btn-wrap">
		<el-button
			type="text"
			size="mini"
			@click="params.context.componentParent.detail(params.data.id)"
		>
			{{ $t("common.viewBtn") }}
		</el-button>
	</div>
</template>
<script>
export default {
	name: 'OperationMergePackBtn',
	data() {
		return {
		}
	},
	beforeMount() {
	},
	methods: {

	}
}
</script>
<style>
</style>
