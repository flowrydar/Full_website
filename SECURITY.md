# Security Configuration

This document outlines the security measures implemented in the Elegant Wedding RSVP application.

## Environment Variables

### Local Development
- Environment variables are stored in `.env` file (not committed to version control)
- Use `.env.example` as a template for required variables
- Never use service_role keys in the frontend application

### Production (AWS Amplify)
- Environment variables are configured in AWS Amplify Console
- Different values are used for development and production environments
- Variables are encrypted at rest and in transit

## Supabase Security

### Authentication
- Using anonymous key for public access
- Session storage used instead of local storage
- Automatic token refresh enabled
- Custom storage key implemented

### Rate Limiting
- 50 requests per minute per operation
- Exponential backoff with jitter for retries
- Operation-specific tracking
- Automatic request blocking when limit exceeded

### Data Access
- Row Level Security (RLS) policies enabled
- Public access restricted to necessary operations only
- Rate limiting on database operations
- Request origin validation

## Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use different keys for different environments
   - Regularly rotate API keys

2. **API Security**
   - Rate limiting implemented
   - Request validation
   - Error handling without sensitive information
   - CORS properly configured

3. **Database Security**
   - RLS policies active
   - Minimal permissions granted
   - Regular security audits
   - Data validation before storage

4. **Client-Side Security**
   - Session storage for sensitive data
   - Input validation
   - XSS prevention
   - CSRF protection

## Monitoring and Maintenance

1. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Regular security audits

2. **Error Handling**
   - Secure error logging
   - No sensitive information in errors
   - Proper error reporting

3. **Access Control**
   - Regular access review
   - Principle of least privilege
   - Regular key rotation

## AWS Amplify Security

1. **Environment Variables**
   - Stored securely in AWS
   - Encrypted at rest
   - Access limited to necessary services

2. **Deployment**
   - Secure build process
   - Environment separation
   - Access control for deployments

## Incident Response

1. **Security Incidents**
   - Document incident response procedures
   - Contact information for security team
   - Steps for key rotation if compromised

2. **Recovery Procedures**
   - Backup and restore procedures
   - Data recovery steps
   - Communication templates

## Compliance

Ensure compliance with:
- Data protection regulations
- Privacy laws
- Security best practices
- Industry standards 