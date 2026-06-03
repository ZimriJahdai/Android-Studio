import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack.jsx';
 
const AppNavigator = () => {
 
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    );
}
 
export default AppNavigator;