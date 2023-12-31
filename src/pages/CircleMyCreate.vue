<template>
    <van-search v-model="searchText" placeholder="搜索圈子" @search="searchCircle"/>
    <template v-for="circle in circleList">
        <van-card
                :title="circle.name"
                :desc="circle.description"
                :thumb="circle.imageUrl"
        >
            <template #tags>
                <div style="margin-top: 5px;">
                    <van-tag plain type="danger">{{ CircleStatusEnum[circle.status] }}</van-tag>
                </div>
            </template>
            <template #footer>
                <van-button type="primary" plain size="small" @click="doUpdate(circle)">更新圈子</van-button>
                <van-button type="warning" plain size="small" @click="doDisband(circle.id)">解散圈子</van-button>
                <van-button type="danger" plain size="small" @click="doLogout(circle.id)">退出圈子</van-button>
            </template>
            <template #bottom>
                圈子人数：{{ circle.memberList.length }}/{{ circle.maxNum }} <br>
                创建时间：{{ circle.createTime }} <br>
                过期时间：{{ circle.expireTime }} <br>
            </template>
        </van-card>
    </template>
    <van-empty image="search" v-if="circleList === null || circleList.length < 1" description="结果为空"/>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, Ref, ref} from "vue";
import request from "../config/request.ts";
import {CircleStatusEnum} from "../constants/CircleStatusEnum.ts";
import {showConfirmDialog, showFailToast, showNotify, showSuccessToast} from "vant";

const router = useRouter();
const searchText = ref('');
const circleList: Ref<CircleType[]> = ref([])


onMounted(() => {
    searchCircle();
})
const searchCircle = async () => {
    const res = await request.get(`/circle/my/create?name=${searchText.value}`);
    if (res.code === 0) {
        circleList.value = res.data
    }
}

/**
 * 更新圈子
 * @param circle
 */
const doUpdate = (circle) => {
    router.push({
        path: "/circle/update/",
        query: {
            circle: JSON.stringify(circle)
        }
    })
}

/**
 * 解散圈子
 * @param circleId
 */
const doDisband = (circleId) => {
    showConfirmDialog({
        title: '解散',
        message:
            '确定解散圈子吗？',
        theme: 'round-button',
    }).then(async () => {
        const res = await request.delete(`/circle/disband/${circleId}`);
        if (res.code === 0) {
            showSuccessToast("解散成功！");
            location.reload();
        } else {
            showFailToast("解散失败");
            showNotify({message: res.descriptioon, type: 'danger'});
        }
    }).catch((err) => {
    });
}

/**
 * 退出圈子
 * @param circleId
 */
const doLogout = (circleId) => {
    showConfirmDialog({
        title: '退出',
        message:
            '确定退出圈子吗？',
        theme: 'round-button',
    }).then(async () => {
        const res = await request.delete(`/circle/quit/${circleId}`);
        if (res.code === 0) {
            showSuccessToast('退出成功');
            location.reload();
        } else {
            showFailToast('退出失败');
            showNotify({message: res.description, type: 'danger'});
        }
    });
}

</script>

<style scoped>
:deep(.van-image__img) {
    height: 120px;
}
</style>