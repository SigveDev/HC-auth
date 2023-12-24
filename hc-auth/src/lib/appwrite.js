import { Client, Account, Avatars, Databases, Query, ID, Storage, Teams } from 'appwrite';

export const client = new Client();

client
    .setEndpoint(process.env.REACT_APP_PROJECT_ENDPOINT)
    .setProject(process.env.REACT_APP_PROJECT_ID);

export const account = new Account(client);

export const avatars = new Avatars(client);

export const databases = new Databases(client);

export const storage = new Storage(client);

export const teams = new Teams(client);

export { ID } from 'appwrite';

export const createJWTToken = async () => {
    const jwt = await account.createJWT();
    return jwt.jwt;
};

export const getUserConfig = async (userId) => {
    try {
        try {
            const promise = await databases.getDocument(
                process.env.REACT_APP_HC_AUTH_DB_ID,
                process.env.REACT_APP_USER_CONFIG_TABLE_ID,
                userId
            );
            return promise;
        } catch {
            const userConfig = await databases.createDocument(
                process.env.REACT_APP_HC_AUTH_DB_ID,
                process.env.REACT_APP_USER_CONFIG_TABLE_ID,
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
            process.env.REACT_APP_HC_AUTH_DB_ID,
            process.env.REACT_APP_APP_REG_TABLE_ID,
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
            process.env.REACT_APP_HC_AUTH_DB_ID,
            process.env.REACT_APP_APP_AUTH_TABLE_ID,
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
            process.env.REACT_APP_HC_AUTH_DB_ID,
            process.env.REACT_APP_APP_AUTH_TABLE_ID,
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
            process.env.REACT_APP_HC_AUTH_DB_ID,
            process.env.REACT_APP_APP_AUTH_TABLE_ID,
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
            process.env.REACT_APP_HC_AUTH_DB_ID,
            process.env.REACT_APP_APP_AUTH_TABLE_ID,
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
            process.env.REACT_APP_HC_AUTH_DB_ID,
            process.env.REACT_APP_APP_REG_TABLE_ID,
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
            process.env.REACT_APP_HC_AUTH_DB_ID,
            process.env.REACT_APP_APP_REG_TABLE_ID,
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
            process.env.REACT_APP_HC_AUTH_DB_ID,
            process.env.REACT_APP_APP_REG_TABLE_ID,
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
            process.env.REACT_APP_HC_AUTH_DB_ID,
            process.env.REACT_APP_APP_REG_TABLE_ID,
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

export const getPFP = async (id) => {
    try {
        const response = storage.getFileView(process.env.REACT_APP_PFP_STORAGE_ID, id);
        const blob = await response.blob();
        return blob;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const updatePFP = async (userId, file) => {
    try {
        const userConfig = await databases.getDocument(
            process.env.REACT_APP_HC_AUTH_DB_ID,
            process.env.REACT_APP_USER_CONFIG_TABLE_ID,
            userId,
        );
        
        if (userConfig.pfp) {
            await storage.deleteFile(process.env.REACT_APP_PFP_STORAGE_ID, userConfig.pfp);
        }

        // Create new file with userId
        const promise = await storage.createFile(process.env.REACT_APP_PFP_STORAGE_ID, ID.unique(), file);

        const fileId = promise.$id;
        await databases.updateDocument(
            process.env.REACT_APP_HC_AUTH_DB_ID,
            process.env.REACT_APP_USER_CONFIG_TABLE_ID,
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

export const createUserConfig = async (userId) => {
    try {
        const promise = await databases.createDocument(
            process.env.REACT_APP_HC_AUTH_DB_ID,
            process.env.REACT_APP_USER_CONFIG_TABLE_ID,
            userId,
            {
                pfp: null
            }
        );
        return promise;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const createUser = async (email, name) => {
    try {
        const promise = await account.create(ID.unique(), email, "changeme", name);
        return promise;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};

export const checkAdmin = async () => {
    try {
        const promise = await teams.list();
        const foundTeam = promise.teams.find((team) => {
            return team.$id === process.env.REACT_APP_ADMIN_TEAM_ID;
        });
        return foundTeam !== undefined;
    } catch {
        const appwriteError = new Error('Appwrite Error');
        throw new Error(appwriteError.message);
    }
};