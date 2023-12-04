import { Client, Account, Avatars, Databases, Query, ID, Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('http://localhost/v1')
    .setProject('655bcd2c47b7012c5735');

export const account = new Account(client);

export const avatars = new Avatars(client);

export const databases = new Databases(client);

export const storage = new Storage(client);

export const createJWTToken = async () => {
    const jwt = await account.createJWT();
    return jwt.jwt;
};

export const getUserConfig = async (userId) => {
    try {
        try {
            const promise = await databases.getDocument(
                '655cecb484fe2e300e29',
                '656e3e4574586638e9a5',
                userId
            );
            return promise;
        } catch {
            const userConfig = await databases.createDocument(
                '655cecb484fe2e300e29',
                '656e3e4574586638e9a5',
                userId,
                {
                    pfp: null
                }
            );
            return userConfig;
        }
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const getAppRegByOwner= async (ownerId) => {
    try {
        const response = await databases.listDocuments(
            '655cecb484fe2e300e29',
            '655cecbf9b0b70cf3357',
            [
                Query.equal('appOwner', ownerId)
            ]
        );
        return response.documents;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const getAppAuths = async (userId) => {
    try {
        const response = await databases.listDocuments(
            '655cecb484fe2e300e29',
            '655d0bb99f877a72fd87',
            [
                Query.equal('userId', userId)
            ]
        );
        return response.documents;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const checkAppAuth = async (userId, appId) => {
    try {
        const checkAuth = await databases.listDocuments(
            '655cecb484fe2e300e29',
            '655d0bb99f877a72fd87',
            [
                Query.equal('userId', userId),
                Query.equal('appRegId', appId)
            ]
        );
        return checkAuth.documents[0];
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const createAppAuth = async (userId, appId) => {
    try {
        const oldAuth = await checkAppAuth(userId, appId);
        if (oldAuth) {
            return oldAuth;
        }

        const appAuth = await databases.createDocument(
            '655cecb484fe2e300e29',
            '655d0bb99f877a72fd87',
            ID.unique(),
            {
                userId: userId,
                appRegId: appId
            }
        );
        return appAuth;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const deleteAppAuth = async (authId) => {
    try {
        const appAuth = await databases.deleteDocument(
            '655cecb484fe2e300e29',
            '655d0bb99f877a72fd87',
            authId
        );
        return appAuth;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const createAppRegistration = async (appName, ownerId, appUrl, appFallbackUrl) => {
    try {
        const appReg = await databases.createDocument(
            '655cecb484fe2e300e29',
            '655cecbf9b0b70cf3357',
            ID.unique(),
            {
                appName: appName,
                appOwner: ownerId,
                appUrl: appUrl,
                appFallbackUrl: appFallbackUrl
            }
        );
        return appReg;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const updateAppRegistration = async (appId, appName, appUrl, appFallbackUrl) => {
    try {
        const appReg = await databases.updateDocument(
            '655cecb484fe2e300e29',
            '655cecbf9b0b70cf3357',
            appId,
            {
                appName: appName,
                appUrl: appUrl,
                appFallbackUrl: appFallbackUrl
            }
        );
        return appReg;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const deleteAppRegistration = async (appId) => {
    try {
        const appReg = await databases.deleteDocument(
            '655cecb484fe2e300e29',
            '655cecbf9b0b70cf3357',
            appId
        );
        return appReg;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const getAppRegByID = async (appId) => {
    try {
        const response = await databases.getDocument(
            '655cecb484fe2e300e29',
            '655cecbf9b0b70cf3357',
            appId
        );
        return response;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const checkUserData = async () => {
    try{
        const account = new Account(client);
        return account.get();
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const updateUserEmail = async (email, password) => {
    try {
        const promise = await account.updateEmail(email, password);
        return promise;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
}

export const updateUserPhone = async (phone, password) => {
    try {
        const promise = await account.updatePhone(phone, password);
        return promise;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const updateUserName = async (name) => {
    try {
        const promise = await account.updateName(name);
        return promise;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const getPFP = async (userId) => {
    try {
        const promise = storage.getFilePreview('656bc6d51ade7be84401', userId);
        return promise;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const updatePFP = async (userId, file) => {
    try {
        const userConfig = await databases.getDocument(
            '655cecb484fe2e300e29',
            '656e3e4574586638e9a5',
            userId
        );
        
        if (userConfig.pfp) {
            await storage.deleteFile('656bc6d51ade7be84401', userConfig.pfp);
        }

        // Create new file with userId
        const promise = await storage.createFile('656bc6d51ade7be84401', ID.unique(), file);

        const fileId = promise.$id;
        await databases.updateDocument(
            '655cecb484fe2e300e29',
            '656e3e4574586638e9a5',
            userId,
            {
                pfp: fileId
            }
        );

        return promise;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const updatePass = async (newPassword, password) => {
    try {
        const promise = account.updatePassword(newPassword, password);
        return promise;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export { ID } from 'appwrite';
