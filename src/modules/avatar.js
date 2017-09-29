import { Avatar } from './database';

export default class {

    static async getAvatarWithId(id) {
        return Avatar.findOne({ where: { id: id } }).catch((error) => {
            console.error(error);
        });
    }
    
    static async updateAvatarWithId(id, post) {
        let avatar = await this.getAvatarWithId(id);
        if (!avatar) return;
        return avatar.update(post);
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