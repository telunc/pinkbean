import { Avatar } from './database';

export default class {
    
    static async updateAvatarWithId(id, post) {
        if (post.selectedItems) post.selectedItems = encodeURI(post.selectedItems);
        return Avatar.update(post, { where: { id: id } });
    }

    static async setAvatar(post) {
        return Avatar.create(post);
    }

    static async deleteAvatarWithId(id) {
        return Avatar.destroy({ where: { id: id } }).catch((error) => {
            console.error(error);
        });
    }
    
}