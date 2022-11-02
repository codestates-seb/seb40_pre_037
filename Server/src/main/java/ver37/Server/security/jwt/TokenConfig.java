package ver37.Server.security.jwt;

public interface TokenConfig {
    public String SECRET_KEY = "codeStates";
    public Long ACCESS_TOKEN_TIME = 60000 * 60L;
    public Long REFRESH_TOKEN_TIME = 60*60*60*24L;
}
