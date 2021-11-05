import fonts from '~/assets/fonts';
import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';

export default PlatformStyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9EAF0',
    ...fonts.type.base(14),
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  icon: {
    marginLeft: 10,
    marginVertical: 20,
  },
  input: {
    // padding: 15,
    height: '100%',
    width: '90%',
  },
});
