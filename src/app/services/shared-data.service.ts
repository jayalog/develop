import { Injectable } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Injectable()
export class SharedDataService {
    username: string;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    userProfile: any;
    os: string;
    image: string;

    constructor() { }

    getUsername(): string {
        return this.username;
    }

    setUsername(username: string): void {
        this.username = username;
    }

    getChipListKeyCodes(): number[] {
        return this.separatorKeysCodes;
    }

    getUserProfile() {
        return this.userProfile;
    }

    setUserProfile(profile) {
        this.userProfile = profile;
    }

    getOs() {
        return this.os || null;
    }

    setOs(os: string) {
        this.os = os;
    }

    getProfileImage(): string {
        return this.image;
    }

    setProfileImage(imageUrl: string): void {
        this.image = imageUrl;
    }


}
