// ȫ������
const common = {
    state: {
        showTabbar: true
    },
    getters: {
        test() {
            return 'common';
        }
    },
    mutations: {
        //���±������أ�payloadΪ����ֵ��������������ʲô
        displayTabbar(state, payload) {

            state.showTabbar = payload;
        }
    },
    actions: {

    }
}

export default common;