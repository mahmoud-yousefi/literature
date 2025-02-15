export interface User {
    id?: string;
    email: string;
    hash: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    role?: string;

    comments: Comment[];
}

export interface Poem {
    id?: string;
    title: string;
    content: string;
    url?: string;

    comments: Comment[];
    relatedContents: RelatedContent[];
}

export interface Picture {
    id?: string;
    url: string;
    caption?: string;
    title: string;

    comments: Comment[];
    relatedContents: RelatedContent[];
}

export interface Memory {
    id?: string;
    title: string;
    content: string;
    date?: Date;
    url?: string;

    comments: Comment[];
    relatedContents: RelatedContent[];
}

export interface Comment {
    id: string;
    content: string;
    userId: string;

    poemId?: string;
    pictureId?: string;

    user: User;
    poem?: Poem;
    picture?: Picture;
    memory?: Memory;
}

export interface RelatedContent {
    id: number;

    poemId?: string;
    pictureId?: string;
    memoryId?: string;

    poem?: Poem;
    picture?: Picture;
    memory?: Memory;
}